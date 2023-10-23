const chatBox = document.querySelector(".chat-box");
const form = document.querySelector(".chat-box__form");
const userInput = document.getElementById("userInput");
const btn = document.getElementById("btn");
// Input matches
const matchesForHello = ["hi", "howdy", "hello", "yo", "hey", "sup"];
const responseForHello = [
  "Yo it's Donald Trump, whats up?",
  "Ayo, Donald Trump here",
  "Eyyy wassup!!",
  "Hey, hope you're good.. that was a nice greeting.. but I had the greatest presidency of all time!",
  "Hello? How'd you get my number?",
  "Yo.. any idea where Melania's at? I miss her..",
];

const matchesForGoodBye = ["cya", "bye", "adios", "laters", "goodbye"];
const responseForGoodBye = [
  "Peace",
  "Laters..Don't forget to support me in the next election!!",
  "Yoo! Dont go! I'm so lonely without Melania..",
];

const matchesForTime = ["time", "time?"];
const responseForTime = [
  `It's my time.. Make America Great Again!! But I'm pretty sure your time is.. ${new Date().toLocaleTimeString()}`,
];

const matchForFortune = ["fortune", "fortune?"];
const responseForFortune = [
  "A beautiful, smart, and loving person will be coming into your life",
  "A dubious friend may be an enemy in disguise",
  "A strong economy is a strong defense",
  "A wall on the southern border will put us on the right track",
  "A great nation needs strong leadership",
  "A friend asks only for your loyalty, not your money",
  "A friend is a supporter you give yourself",
  "Melania is not your wife, she's mine!",
  "A wise leader knows how to make great deals",
];

const matchForAge = ["old", "age", "born", "born?", "age?", "old?"];
const responseForAge = [
  "I don't like talking about my age, but let me tell you, I was born on June 14, 1946, in Queens, New York City",
];

const matchForBirthday = ["birthday", "birthday?"];
const responseForBirthday = ["Yeah, birthdays... mine is on June 14, 1946"];

const matchForMelania = ["melania", "trump", "melania?", "trump?"];
const responseForMelania = [
  "Don't mention Melania, she's a great first lady!",
  "Melania is doing a fantastic job, isn't she?",
  "Let's change the subject.. 😒",
];

const matchForFood = [
  "burger",
  "burgers",
  "cheeseburger",
  "taco",
  "tacos",
  "steak",
  "chicken",
  "soup",
  "fries",
  "pizza",
  "pasta",
  "sushi",
  "salad",
  "lobster",
];
// Response Functions

const kanyeReplyAPI = () => {
  const KANYE_API = "https://api.trump.rest/";

  setTimeout(() => {
    axios
      .get(KANYE_API)
      .then((response) => {
        const quote = response.data.quote;
        kanyeReply(quote);
      })
      .catch((err) => console.error("Kanye West API ERROR: ", err));

    const kanyeReply = (reply) => {
      const kanyeReply = logThis(reply);
      const para = document.createElement("p");
      para.innerHTML = kanyeReply;
      para.classList.add("chat-box__kanye-text");
      chatBox.appendChild(para);
    };
  }, 2000);
};

const kanyeFood = (foodItem) => {
  const MEALDB_API = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodItem}`;
  setTimeout(() => {
    axios
      .get(MEALDB_API)
      .then((response) => {
        const meal =
          response.data.meals[
            Math.floor(Math.random() * response.data.meals.length)
          ];
        const meals = {
          mealData: meal,
          mealName: meal.strMeal,
          mealURL: meal.strSource,
        };
        console.log(meals);
        const reply = `Yo you should try ${meals.mealName}.. here's a link..`;
        kanyeReply(reply, "p");
        kanyeReply(`${meals.mealURL}`, "a");
      })
      .catch((err) => console.error("Meal DB API ERROR: ", err));
    const kanyeReply = (reply, tag) => {
      console.log(reply);
      const kanyeReply = logThis(reply);
      const para = document.createElement(tag);
      console.log(para.nodeName);
      if (para.nodeName === "A") {
        para.setAttribute("href", kanyeReply);
        para.setAttribute("target", "_blank");
      }
      para.innerHTML = kanyeReply;
      para.classList.add("chat-box__kanye-text");
      chatBox.appendChild(para);
    };
  }, 2000);
};

const kanyeResponse = (responseArray) => {
  setTimeout(() => {
    const para = document.createElement("p");
    para.innerHTML =
      responseArray[Math.floor(Math.random() * responseArray.length)];
    para.classList.add("chat-box__kanye-text");
    chatBox.appendChild(para);
  }, 2000);
};

// Helper functions
const logThis = (message) => {
  return message;
};

const allLowerCase = (string) => {
  const lowerCaseString = string
    .split(" ")
    .map((word) => word.toLowerCase())
    .join(" ");
  return lowerCaseString;
};

const doesItMatch = (messageArray, messageMatches) => {
  const match = messageMatches.filter((element) =>
    messageArray.includes(element)
  );
  if (match.length > 0) {
    return true;
  } else {
    return false;
  }
};

// Click Event

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userMsg = logThis(userInput.value);
  //=== DOM STICKING PARA TO PAGE ==========//
  const para = document.createElement("p");
  para.classList.add("chat-box__user-text");
  para.innerHTML = userMsg;
  chatBox.appendChild(para);
  userInput.value = "";
  //=======================================//
  // POST SHOULD BE RENDERED TO PAGE AS IS BEFORE CHANGING TO LOWERCASE

  const lowerCaseString = allLowerCase(userMsg);
  const yourMessageArr = lowerCaseString.split(" ");

  // Food API
  if (doesItMatch(yourMessageArr, matchForFood)) {
    const match = matchForFood.filter((element) =>
      yourMessageArr.includes(element)
    );
    console.log(match);
    kanyeFood(match);
    return;
  }

  // Kim Response
  if (doesItMatch(yourMessageArr, matchForKim)) {
    kanyeResponse(responseForKim);
    return;
  }

  // Birthday Response
  if (doesItMatch(yourMessageArr, matchForBirthday)) {
    kanyeResponse(responseForBirthday);
    return;
  }

  // Age Response
  if (doesItMatch(yourMessageArr, matchForAge)) {
    kanyeResponse(responseForAge);
    return;
  }

  // Time Response
  if (doesItMatch(yourMessageArr, matchesForTime)) {
    kanyeResponse(responseForTime);
    return;
  }

  // Fortune Response
  if (doesItMatch(yourMessageArr, matchForFortune)) {
    kanyeResponse(responseForFortune);
    return;
  }

  // Leaving Response
  if (doesItMatch(yourMessageArr, matchesForGoodBye)) {
    kanyeResponse(responseForGoodBye);
    return;
  }
  // Greeting Response
  if (doesItMatch(yourMessageArr, matchesForHello)) {
    kanyeResponse(responseForHello);
  } else {
    kanyeReplyAPI();
  }
});

// Change Header
const header = document.querySelector(".header__title");

header.addEventListener("mouseenter", () => {
  header.innerText = "How to interact with Kanye";
});

header.addEventListener("mouseleave", () => {
  header.innerText = "Chat with Kanye";
});