import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt } from "@graphprotocol/graph-ts"
import { WineItemCreated } from "../generated/schema"
import { WineItemCreated as WineItemCreatedEvent } from "../generated/WineTraceability/WineTraceability"
import { handleWineItemCreated } from "../src/wine-traceability"
import { createWineItemCreatedEvent } from "./wine-traceability-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let wineID = BigInt.fromI32(234)
    let stage = 123
    let wineryData = "ethereum.Tuple Not implemented"
    let batchData = "ethereum.Tuple Not implemented"
    let tankID = BigInt.fromI32(234)
    let barrelID = BigInt.fromI32(234)
    let bottleID = BigInt.fromI32(234)
    let wineItemCount = 123
    let newWineItemCreatedEvent = createWineItemCreatedEvent(
      wineID,
      stage,
      wineryData,
      batchData,
      tankID,
      barrelID,
      bottleID,
      wineItemCount
    )
    handleWineItemCreated(newWineItemCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("WineItemCreated created and stored", () => {
    assert.entityCount("WineItemCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "WineItemCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "wineID",
      "234"
    )
    assert.fieldEquals(
      "WineItemCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "stage",
      "123"
    )
    assert.fieldEquals(
      "WineItemCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "wineryData",
      "ethereum.Tuple Not implemented"
    )
    assert.fieldEquals(
      "WineItemCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "batchData",
      "ethereum.Tuple Not implemented"
    )
    assert.fieldEquals(
      "WineItemCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tankID",
      "234"
    )
    assert.fieldEquals(
      "WineItemCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "barrelID",
      "234"
    )
    assert.fieldEquals(
      "WineItemCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "bottleID",
      "234"
    )
    assert.fieldEquals(
      "WineItemCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "wineItemCount",
      "123"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
