import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { BatchCreated } from "../generated/schema"
import { BatchCreated as BatchCreatedEvent } from "../generated/BatchManagement1/BatchManagement1"
import { handleBatchCreated } from "../src/batch-management-1"
import { createBatchCreatedEvent } from "./batch-management-1-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let id = BigInt.fromI32(234)
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let batchName = "Example string value"
    let wineryName = "Example string value"
    let wineryBatchCount = BigInt.fromI32(234)
    let newBatchCreatedEvent = createBatchCreatedEvent(
      id,
      owner,
      batchName,
      wineryName,
      wineryBatchCount
    )
    handleBatchCreated(newBatchCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BatchCreated created and stored", () => {
    assert.entityCount("BatchCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BatchCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BatchCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "batchName",
      "Example string value"
    )
    assert.fieldEquals(
      "BatchCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "wineryName",
      "Example string value"
    )
    assert.fieldEquals(
      "BatchCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "wineryBatchCount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
