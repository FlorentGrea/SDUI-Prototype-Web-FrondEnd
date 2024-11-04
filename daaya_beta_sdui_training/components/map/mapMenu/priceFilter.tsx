import Container from "@/components/container";
import { useState } from 'react';

export default function PriceFilter() {
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [priceDistribution] = useState([
        10, 25, 45, 60, 30, 20, 15, 10, 5, 2
    ]);

    return (
        <Container className="w-full h-fit px-4 py-6">
            <div className="relative w-full h-12">
                {/* Price distribution bars */}
                <div className="absolute w-full h-8 flex items-end">
                    {priceDistribution.map((height, i) => (
                        <div
                            key={i}
                            className="flex-1 mx-[1px] bg-gray-200"
                            style={{
                                height: `${(height / Math.max(...priceDistribution)) * 100}%`
                            }}
                        />
                    ))}
                </div>
                
                {/* Range inputs */}
                <input
                    type="range"
                    min={0}
                    max={1000}
                    step={10}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="absolute w-full top-7 z-30 pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:z-40 [&::-webkit-slider-thumb]:shadow-[0px_0px_4px_1px_#00000060]"
                />
                <input
                    type="range"
                    min={0}
                    max={1000}
                    step={10}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="absolute w-full top-7 z-30 pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:z-40 [&::-webkit-slider-thumb]:shadow-[0px_0px_4px_1px_#00000060]"
                />
                
                {/* Track */}
                <div className="absolute h-1 w-full rounded top-9 bg-gray-200">
                    <div
                        className="absolute h-full bg-black"
                        style={{
                            left: `${(priceRange[0] / 1000) * 100}%`,
                            width: `${((priceRange[1] - priceRange[0]) / 1000) * 100}%`
                        }}
                    />
                </div>
            </div>
            
            <div className="flex justify-between mt-2">
                <span>€{priceRange[0]}</span>
                <span>€{priceRange[1]}</span>
            </div>
        </Container>
    );
}