const bolt = document.getElementById("bolt")
let clicks = 0
let passive = 0;
const counter = document.getElementById("energy")
const counterP = document.getElementById("energy/sec")
let inc = 1.225;

const hC = document.getElementById("hC")
let hCCost = 10;
let hCOwned = 0;
let hCRate = 0.5

const Earn = (amount, from) => {
  if (amount < 1 || (from !== "Main" && from !== "EventListener" && from !== "HelperFunc")) {
    clicks += amount;
    counter.textContent = clicks.toFixed(1);
  }
}

const Buy = (ownedItems, priceItem, rateItem, itemCountElement, itemPriceElement, from) => {
  if ((from !== "Main" && from !== "EventListener" && from !== "HelperFunc") || (itemCountElement === null || itemPriceElement === null)) {
    return
  }
  Lose(priceItem, "HelperFunc")
  priceItem *= inc
  itemPriceElement.textContent = priceItem.toFixed(1)
  ownedItems++
  itemCountElement.textContent = ownedItems
  passive += rateItem
  counterP.textContent = passive.toFixed(1);
}

const Lose = (amount, from) => {
  if (amount < 1 || (from !== "Main" && from !== "EventListener")) {
    clicks -= amount;
    counter.textContent = clicks.toFixed(1);
  }
}

bolt.addEventListener("click", () => {
  clicks++
  counter.textContent = clicks;
})

if (hC !== null) {
  hC.addEventListener("click", () => {
    if (clicks >= hCCost) {
      const hCP = document.getElementById("hCP")
      const hCO = document.getElementById("hCO")
      Buy(hCOwned, hCCost, hCRate, hCO, hCP, "EventListener")
    }
  })
}

setInterval(() => {
	Earn(passive, "Main")
}, 1000)
