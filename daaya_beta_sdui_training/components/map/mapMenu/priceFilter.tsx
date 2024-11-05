import Container from "@/components/container";
import { useState } from 'react';

interface PriceInputProps {
    value: number;
    onChange: (value: number) => void;
    onBlur: (value: number) => void;
}

const PriceInput = ({ value, onChange, onBlur }: PriceInputProps) => (
    <div className="relative">
        <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            onBlur={(e) => onBlur(Number(e.target.value))}
            className="w-20 text-base font-bold text-center border rounded-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-lg font-bold">€</span>
    </div>
);

const RANGE_BASE_STYLES = `
  absolute w-full top-7
  appearance-none bg-transparent
  border-none outline-none
  [&::-webkit-slider-thumb]:w-5
  [&::-webkit-slider-thumb]:h-5
  [&::-webkit-slider-thumb]:rounded-full
  [&::-webkit-slider-thumb]:bg-white
  [&::-webkit-slider-thumb]:border-2
  [&::-webkit-slider-thumb]:border-black
  [&::-webkit-slider-thumb]:shadow-[0px_0px_4px_1px_#00000060]
  [&::-webkit-slider-thumb]:appearance-none
  [&::-webkit-slider-thumb]:cursor-pointer
  [&::-webkit-slider-runnable-track]:h-0
  [&::-webkit-slider-runnable-track]:bg-transparent
  [&::-webkit-slider-runnable-track]:border-none
`;

const MIN_RANGE_INPUT_STYLES = `${RANGE_BASE_STYLES} z-40 [&::-webkit-slider-thumb]:z-50`;
const MAX_RANGE_INPUT_STYLES = `${RANGE_BASE_STYLES} z-30 [&::-webkit-slider-thumb]:z-40`;

export default function PriceFilter() {
    const MIN_PRICE = 10;
    const MAX_PRICE = 210;
    
    const [priceRange, setPriceRange] = useState([MIN_PRICE, MAX_PRICE]);
    const [priceDistribution] = useState(
        Array.from({ length: 50 }, () => Math.floor(Math.random() * 50) + 10)
    );

    const handleMinPriceChange = (value: number) => {
        if (isNaN(value)) {
            setPriceRange([MIN_PRICE, priceRange[1]]);
            return;
        }
        // Clamp the value between MIN_PRICE and current max price
        const clampedValue = Math.max(MIN_PRICE, Math.min(value, priceRange[1]));
        setPriceRange([clampedValue, priceRange[1]]);
    };

    const handleMaxPriceChange = (value: number) => {
        if (isNaN(value)) {
            setPriceRange([priceRange[0], MAX_PRICE]);
            return;
        }
        // Clamp the value between current min price and MAX_PRICE
        const clampedValue = Math.min(MAX_PRICE, Math.max(value, priceRange[0]));
        setPriceRange([priceRange[0], clampedValue]);
    };

    const handleMinPriceBlur = (value: number) => {
        let newValue = value;
        if (isNaN(value) || value < MIN_PRICE) newValue = MIN_PRICE;
        if (value > priceRange[1]) newValue = priceRange[1];
        setPriceRange([newValue, priceRange[1]]);
    };

    const handleMaxPriceBlur = (value: number) => {
        let newValue = value;
        if (isNaN(value) || value > MAX_PRICE) newValue = MAX_PRICE;
        if (value < priceRange[0]) newValue = priceRange[0];
        setPriceRange([priceRange[0], newValue]);
    };

    const getBarColor = (barPrice: number) => 
        barPrice >= priceRange[0] && barPrice <= priceRange[1] ? 'bg-black' : 'bg-gray-200';

    const calculateBarPrice = (index: number) => 
        Math.round(MIN_PRICE + (index / (priceDistribution.length - 1)) * (MAX_PRICE - MIN_PRICE));

    return (
        <Container className="w-full h-fit px-4 py-6">
            <div className="relative w-full h-12">
                {/* Price distribution bars */}
                <div className="absolute w-full h-8 flex items-end z-10 bottom-3">
                    {priceDistribution.map((height, i) => (
                        <div
                            key={i}
                            className={`flex-1 mx-[1px] rounded-t-xs ${getBarColor(calculateBarPrice(i))}`}
                            style={{
                                height: `${(height / Math.max(...priceDistribution)) * 100}%`
                            }}
                        />
                    ))}
                </div>
                
                {/* Track */}
                <div className="absolute h-1 w-[calc(100%)] rounded top-9 bg-gray-200">
                    <div
                        className="absolute h-full bg-black"
                        style={{
                            left: `${((priceRange[0] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                            width: `${((priceRange[1] - priceRange[0]) / (MAX_PRICE - MIN_PRICE)) * 100}%`
                        }}
                    />
                </div>
                
                {/* Range inputs */}
                <div className="absolute w-[calc(100%+20px)] -left-[10px]">
                    <input
                        type="range"
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        step={1}
                        value={priceRange[0]}
                        onChange={(e) => handleMinPriceChange(Number(e.target.value))}
                        className={MIN_RANGE_INPUT_STYLES}
                    />
                    <input
                        type="range"
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        step={1}
                        value={priceRange[1]}
                        onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
                        className={MAX_RANGE_INPUT_STYLES}
                    />
                </div>
            </div>
            
            <div className="flex justify-between mt-2">
                <PriceInput value={priceRange[0]} onChange={handleMinPriceChange} onBlur={handleMinPriceBlur} />
                <PriceInput value={priceRange[1]} onChange={handleMaxPriceChange} onBlur={handleMaxPriceBlur} />
            </div>
        </Container>
    );
}