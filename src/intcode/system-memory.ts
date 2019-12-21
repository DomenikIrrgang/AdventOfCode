import { Memory } from "./memory"
import { Process } from "./process"
import { MemoryAllocation } from "./memory-allocation"

export class SystemMemory implements Memory {

    private data: number[] = []
    private allocations: MemoryAllocation[] = []

    public constructor(private startAddress, private size: number, private defaultValue: number = 0) {
        this.reset()
    }

    public reset(): void {
        for (let address = 0; address < this.size; address++) {
            this.data[address] = this.getDefaultValue()
        }
    }

    public read(process: Process, address: number): number {
        this.assertHasAccess(process, address)
        this.assertIsAllocated(address)
        this.assertIsInRange(address)
        return this.data[address]
    }

    public write(process: Process, address: number, value: number): void {
        this.assertHasAccess(process, address)
        this.assertIsAllocated(address)
        this.assertIsInRange(address)
        this.data[address] = value
    }

    public setData(process: Process, address: number, data: number[]): void {
        this.data.splice(address, data.length, ...data)
    }

    public getSize(): number {
        return this.size
    }

    public getDefaultValue(): number {
        return this.defaultValue
    }

    public allocate(process: Process, size: number): MemoryAllocation {
        let address = this.findFreeSpace(size)
        if (address !== undefined) {
            let allocation: MemoryAllocation = Object.freeze({
                startAddress: address,
                endAddress: address + size - 1,
                processId: process.getId()
            })
            this.allocations.push(allocation)
            return allocation
        } else {
            throw new Error(`Could not allocate a block of ${size} memory.`)
        }
    }

    private assertIsInRange(address: number): void {
        if (!this.isInRange(address)) 
            throw new Error(`Cannot access from memory on address "${address}". A valid range is 0-${this.size}.`)
    }

    private assertIsAllocated(address: number): void {
        if (this.findAllocation(address) === undefined)
            throw new Error("Cannot access unallocated memory.")
    }

    private assertHasAccess(process: Process, address: number): void {
        if (this.findAllocation(address) === undefined || this.findAllocation(address).processId !== process.getId())
            throw new Error(`The address ${address} is not allocated to process "${process.getName()} (${process.getId()})"`)
    }

    private findAllocation(address: number): MemoryAllocation {
        let allocation: MemoryAllocation = undefined
        this.allocations.forEach(value => {
            if (value.startAddress <= address && value.endAddress >= address) {
                allocation = value
            }
        })
        return allocation
    }

    private findAllocationInRange(startAddress: number, endAddress: number): MemoryAllocation {
        let allocation: MemoryAllocation = undefined
        this.allocations.forEach(value => {
            if ((value.startAddress >= startAddress && value.startAddress <= endAddress)
                || (value.endAddress >= startAddress && value.endAddress <= endAddress)) {
                allocation = value
            }
        })
        return allocation
    }

    private findFreeSpace(size: number): number {
        let currentAddress = 0
        while (currentAddress + size < this.size) {
            const allocation = this.findAllocationInRange(currentAddress, currentAddress + size)
            if (allocation === undefined) {
                return currentAddress
            }
            currentAddress = allocation.endAddress + 1
        }
        return undefined
    }

    public free(process: Process, memory: MemoryAllocation): void {
        this.assertHasAccess(process, memory.startAddress)
        this.allocations.splice(this.allocations.findIndex(value => value.startAddress === memory.startAddress), 1)
    }

    public isInRange(address: number): boolean {
        return address >= this.startAddress && address < this.startAddress + this.size
    }

}