
const categories = {
  "童話類": ["經典童話", "現代童話", "魔法童話", "動物童話", "勵志童話", "黑暗童話", "幼兒啟蒙童話", "奇幻童話", "教育寓言童話", "搞笑童話"],
  "寓言故事": ["伊索寓言", "中國寓言", "勵志寓言", "動物寓言", "自創寓言", "少兒寓言", "短篇寓言", "多結局寓言", "神話寓言混合型", "價值觀教育寓言"],
  "校園生活": ["國中生活", "高中生活", "同學友誼", "校園戀愛", "師生故事", "搞笑校園事", "青春煩惱", "補習班趣事", "學習挫折與成長", "校園驚魂"],
  "家庭關係": ["親子故事", "手足之情", "三代同堂", "喪親與療癒", "單親家庭", "成長中的家庭誤會", "宠物與家庭", "父母管教 vs 理解", "節日家庭團聚", "家庭中的秘密"],
  "奇幻與冒險": ["魔法世界", "龍與騎士", "時空穿越", "異世界冒險", "超能力者", "魔法學園", "神話生物冒險", "精靈與森林", "古老預言", "傳奇寶物任務"],
  "愛情類": ["初戀物語", "暗戀故事", "戀愛三角關係", "遠距離戀情", "重逢與和解", "青澀愛情", "戀愛與友情衝突", "成長中的愛情", "過去與未來的情人", "浪漫奇幻愛情"],
  "懸疑與驚悚": ["校園謎案", "失蹤事件", "懸疑推理故事", "靈異傳說", "夢境與真相交錯", "怪異小鎮事件", "僅此一夜恐怖", "小朋友也能聽的微驚悚", "良知與罪惡", "洗冤與偵查"],
  "科幻與未來": ["未來城市", "人工智慧", "外星生命", "虛擬實境", "科技與人性", "太空探險", "生化危機", "世界毀滅與重建", "時光旅行", "青少年與科技危機"],
  "歷史與文化": ["中國古代故事", "西洋歷史小品", "傳說人物傳記", "古代戰爭故事", "民間故事", "宮廷鬥爭", "歷史上的孩子們", "發明與發現歷程", "歷史人物童年", "世界文化交流"],
  "現代日常／勵志成長": ["勇氣挑戰故事", "突破自我限制", "友情與背叛", "失敗與再起", "心靈療癒系故事", "面對社交壓力", "學會說「不」", "自我價值建立", "勵志成功案例故事", "平凡中的感動"]
};

const horrorCategory = "懸疑與驚悚";

function getRandomStory() {
  let safeCategories = Object.keys(categories).filter(cat => cat !== horrorCategory);
  let category = safeCategories[Math.floor(Math.random() * safeCategories.length)];
  let story = categories[category][Math.floor(Math.random() * categories[category].length)];
  return { category, story };
}

function showTodayRecommendation() {
  const { category, story } = getRandomStory();
  document.getElementById('recommendation').innerText = `推薦故事：${story}（分類：${category}）`;
  localStorage.setItem("lastStory", story);
  sendToDiscord(story, category);
}

function sendToDiscord(story, category) {
  const webhookURL = 'https://discord.com/api/webhooks/1369557898799222844/iPxOkYmkisZ2z31HoFfPqFOV9lXwiHqfq91FjrGqMBKStWFdZERPljwpI1caLg5txxkG';
  fetch(webhookURL, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: `今天推薦的故事是：《${story}》（分類：${category}）`
    })
  });
}

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  const data = JSON.parse(localStorage.getItem("users") || "{}");
  if (data[user] && data[user].password === pass) {
    localStorage.setItem("currentUser", user);
    alert(`歡迎 ${user}！`);
    loadUserData();
  } else {
    alert("登入失敗");
  }
}

function register() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  let data = JSON.parse(localStorage.getItem("users") || "{}");
  if (data[user]) return alert("使用者已存在");
  data[user] = { password: pass, cans: 10, history: [] };
  localStorage.setItem("users", JSON.stringify(data));
  alert("註冊成功！");
}

function loadUserData() {
  const user = localStorage.getItem("currentUser");
  if (!user) return;
  const data = JSON.parse(localStorage.getItem("users"))[user];
  document.getElementById("cans").innerText = `罐頭數量：${data.cans}`;
  document.getElementById("history").innerText = `最近看過的故事：${data.history.slice(-3).join(", ") || "尚無紀錄"}`;
}

window.onload = () => {
  showTodayRecommendation();
  loadUserData();
};
