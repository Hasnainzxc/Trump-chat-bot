const chatBox = document.querySelector(".chat-box");
const form = document.querySelector(".chat-box__form");
const userInput = document.getElementById("userInput");
const btn = document.getElementById("btn");

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

const matchesForDating = ["dating", "who you been dating"];
const responseForDating = [
  "I've been a bit busy with politics to date lately.",
];

const matchesForWeather = ["weather", "how's the weather"];
const responseForWeather = [
  "I don't care about the weather, but it's great because I'm here!",
];

const matchesForFavoriteSong = ["favorite song", "fav songs"];
const responseForFavoriteSong = [
  "I love all the songs that play at my rallies!",
];

const matchesForFavoriteFood = ["favorite food", "fav meal"];
const responseForFavoriteFood = [
  "I'm a big fan of fast food, especially hamburgers!",
];

const matchesForMakeAmericaGreatAgain = ["make America great again"];
const responseForMakeAmericaGreatAgain = [
  "I will make America great again through tremendous deals and leadership!",
];

const spicyQuestions = [
  "Who's your favorite politician?",
  "Tell me a joke, Donald!",
  "What's your secret to great hair?",
];

const spicyResponses = [
  "My favorite politician? Well, I'd say I'm my own favorite politician!",
  "Why did the chicken cross the road? To make America great again!",
  "The secret to great hair is a mystery known only to a select few, very few, believe me!",
];

const trumpReplyAPI = () => {
  const TRUMP_API = "https://api.trump.rest/";

  setTimeout(() => {
    axios
      .get(TRUMP_API)
      .then((response) => {
        const quote = response.data.quote;
        trumpReply(quote);
      })
      .catch((err) => console.error("Donald Trump API ERROR: ", err));

    const trumpReply = (reply) => {
      const trumpReply = logThis(reply);
      const para = document.createElement("p");
      para.innerHTML = trumpReply;
      para.classList.add("chat-box__trump-text");
      chatBox.appendChild(para);
    };
  }, 2000);
};

const trumpFood = (foodItem) => {
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
        const reply = `You should try ${meals.mealName}.. here's a link..`;
        trumpReply(reply, "p");
        trumpReply(`${meals.mealURL}`, "a");
      })
      .catch((err) => console.error("Meal DB API ERROR: ", err));
    const trumpReply = (reply, tag) => {
      console.log(reply);
      const trumpReply = logThis(reply);
      const para = document.createElement(tag);
      console.log(para.nodeName);
      if (para.nodeName === "A") {
        para.setAttribute("href", trumpReply);
        para.setAttribute("target", "_blank");
      }
      para.innerHTML = trumpReply;
      para.classList.add("chat-box__trump-text");
      chatBox.appendChild(para);
    };
  }, 2000);
};

const trumpResponse = (responseArray) => {
  setTimeout(() => {
    const para = document.createElement("p");
    para.innerHTML =
      responseArray[Math.floor(Math.random() * responseArray.length)];
    para.classList.add("chat-box__trump-text");
    chatBox.appendChild(para);
  }, 2000);
};

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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userMsg = logThis(userInput.value);
  const para = document.createElement("p");
  para.classList.add("chat-box__user-text");
  para.innerHTML = userMsg;
  chatBox.appendChild(para);
  userInput.value = "";

  const lowerCaseString = allLowerCase(userMsg);
  const yourMessageArr = lowerCaseString.split(" ");

  if (doesItMatch(yourMessageArr, matchForFood)) {
    const match = matchForFood.filter((element) =>
      yourMessageArr.includes(element)
    );
    console.log(match);
    trumpFood(match);
    return;
  }

  if (doesItMatch(yourMessageArr, matchForMelania)) {
    trumpResponse(responseForMelania);
    return;
  }

  if (doesItMatch(yourMessageArr, matchForBirthday)) {
    trumpResponse(responseForBirthday);
    return;
  }

  if (doesItMatch(yourMessageArr, matchForAge)) {
    trumpResponse(responseForAge);
    return;
  }

  if (doesItMatch(yourMessageArr, matchesForTime)) {
    trumpResponse(responseForTime);
    return;
  }

  if (doesItMatch(yourMessageArr, matchForFortune)) {
    trumpResponse(responseForFortune);
    return;
  }

  if (doesItMatch(yourMessageArr, matchesForGoodBye)) {
    trumpResponse(responseForGoodBye);
    return;
  }

  if (doesItMatch(yourMessageArr, matchesForHello)) {
    trumpResponse(responseForHello);
  } else {
    trumpReplyAPI();
  }

  // New Spicy Questions and Responses
  if (doesItMatch(yourMessageArr, spicyQuestions)) {
    const index = spicyQuestions.findIndex((question) =>
      yourMessageArr.includes(question.toLowerCase())
    );
    if (index !== -1) {
      trumpResponse([spicyResponses[index]]);
    }
  }
});

const header = document.querySelector(".header__title");

header.addEventListener("mouseenter", () => {
  header.innerText = "How to interact with Donald Trump";
});

header.addEventListener("mouseleave", () => {
  header.innerText = "Chat with Donald Trump";
});
