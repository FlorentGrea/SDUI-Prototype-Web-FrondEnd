import { useState } from 'react';
import Container from '@/components/container';

// You can expand this list as needed
const LANGUAGES = [
    'English', 'Spanish', 'French', 'German', 'Italian', 
    'Portuguese', 'Dutch', 'Russian', 'Chinese', 'Japanese'
];

export default function LanguageFilter() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const suggestions = LANGUAGES.filter(language => 
        language.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedLanguages.includes(language)
    );

    const handleSelectLanguage = (language: string) => {
        setSelectedLanguages([...selectedLanguages, language]);
        setSearchTerm('');
        setShowSuggestions(false);
    };

    const handleToggleLanguage = (language: string) => {
        setSelectedLanguages(selectedLanguages.filter(l => l !== language));
    };

    return (
        <div className="relative">
            <Container className="w-full h-10 p-1 px-2 flex flex-row rounded-lg items-center bg-[#eeeeee]">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Ajouter une langue"
                    className="w-full h-full text-base bg-transparent outline-none"
                />
            </Container>

            {/* Suggestions dropdown */}
            {showSuggestions && searchTerm && (
                <div className="absolute z-10 w-full bg-white rounded mt-1">
                    {suggestions.map(language => (
                        <div
                            key={language}
                            onClick={() => handleSelectLanguage(language)}
                            className="p-2 rounded-lg hover:bg-[#eeeeee] cursor-pointer"
                        >
                            {language}
                        </div>
                    ))}
                </div>
            )}

            {/* Selected languages */}
            <div className="mt-2 space-y-2">
                {selectedLanguages.map(language => (
                    <div key={language} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={true}
                            onChange={() => handleToggleLanguage(language)}
                            className="h-4 w-4"
                        />
                        <span>{language}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}