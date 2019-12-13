import * as readline from "readline"
import * as fs from "fs"

const lineReader = readline.createInterface({
    input: fs.createReadStream("files/day1/input")
})

let fuel = 0
let extraFuel = 0

function calculateFuelCost(mass: number): number {
    const cost = Math.floor(mass / 3) - 2
    return cost < 0 ? 0 : cost
}

function calculateExtraFuelCost(totalMass: number, remainingMass: number): number {
    const cost = calculateFuelCost(remainingMass)
    return cost === 0 ? totalMass : calculateExtraFuelCost(totalMass + cost, cost)
}

lineReader.on("line", (line: string) => {
    const cost = calculateFuelCost(+line)
    fuel += cost
    extraFuel += calculateExtraFuelCost(0, cost)
})

lineReader.on("close", () => {
    console.log("The fuel cost is:", fuel)
    console.log("The extra fuel cost is:", extraFuel)
    console.log("The total fuel cost is:", fuel + extraFuel)
})

console.log(calculateExtraFuelCost(0, 14))
console.log(calculateExtraFuelCost(0, 100756))
console.log(calculateExtraFuelCost(0, 1969))