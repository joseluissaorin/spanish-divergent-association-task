// static/js/components/WordGrid.js
const WordGrid = ({ words, distances }) => {
  // Calculate the maximum distance to normalize colors
  const maxDistance = Math.max(...Object.values(distances).flatMap(d => Object.values(d)));
  
  // Calculate the width needed based on the longest word
  const longestWordLength = Math.max(...words.map(word => word.length));
  // Responsive cell width - only for mobile
  const isMobile = window.innerWidth < 640;
  const cellWidth = isMobile ? Math.min(48, 44) : 110; // Increased width for mobile
  const maxChars = isMobile ? 4 : 12; // Maximum characters to show before truncating
  
  // Calculate total width for centering
  const totalMatrixWidth = cellWidth + (words.length * (cellWidth + (isMobile ? 6 : 4))); // Increased spacing for mobile
  
  const getBackgroundColor = (distance) => {
    // Green gradient from lighter to darker based on distance
    if (distance >= 95) return 'bg-green-200';
    if (distance >= 85) return 'bg-green-100';
    if (distance >= 75) return 'bg-green-50';
    return 'bg-red-50';
  };

  const getDistance = (word1, word2) => {
    if (distances[word1] && distances[word1][word2]) {
      return distances[word1][word2];
    }
    if (distances[word2] && distances[word2][word1]) {
      return distances[word2][word1];
    }
    return 0;
  };

  // Helper function to truncate words consistently
  const truncateWord = (word) => {
    if (!isMobile) return word;
    return word.length > maxChars ? `${word.slice(0, maxChars)}...` : word;
  };

  // Mobile wrapper component
  const MobileWrapper = ({ children }) => (
    isMobile ? (
      <div className="max-w-full overflow-x-auto pb-4 -mx-0 px-0">
        {children}
      </div>
    ) : children
  );

  return (
    <div className={`mt-8 flex justify-center ${isMobile ? 'mx-0' : ''}`}>
      <MobileWrapper>
        <div style={{ 
          width: `${totalMatrixWidth}px`, 
          marginLeft: isMobile ? '0' : '-10%'
        }}>
          <div className="flex">
            {/* Left side labels */}
            <div className="flex flex-col mr-3" style={{ width: `${cellWidth}px` }}>
              {words.map((word, i) => (
                <div 
                  key={i} 
                  className={`h-8 flex items-center font-medium whitespace-nowrap
                    ${isMobile ? 'text-xs px-1' : 'text-sm'}`}
                  title={word}
                >
                  {truncateWord(word)}
                </div>
              ))}
            </div>

            {/* Matrix grid */}
            <div>
              {words.map((word1, i) => (
                <div key={i} className="flex h-8">
                  {words.map((word2, j) => {
                    // Only show lower triangular part
                    if (j >= i) return null;
                    
                    const distance = getDistance(word1, word2);
                    return (
                      <div
                        key={j}
                        style={{ width: `${cellWidth}px` }}
                        className={`${isMobile ? 'mx-1' : 'mx-0.5'} flex items-center justify-center
                          ${isMobile ? 'text-xs' : 'text-sm'}
                          ${getBackgroundColor(distance)}`}
                      >
                        {distance}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom labels container */}
          <div className="relative" style={{ height: isMobile ? '90px' : '100px' }}>
            {/* Bottom labels */}
            <div 
              className="absolute flex mt-8" 
              style={{ marginLeft: `${cellWidth + (isMobile ? 8 : 10)}px` }}
            >
              {words.map((word, i) => (
                <div
                  key={i}
                  style={{ width: `${cellWidth}px` }}
                  className={`${isMobile ? 'mx-1' : 'mx-0.5'} font-medium text-center whitespace-nowrap
                    ${isMobile ? 'text-xs' : 'text-sm'}`}
                  title={word}
                >
                  {truncateWord(word)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </MobileWrapper>
    </div>
  );
};

// Make WordGrid component globally available
window.WordGrid = WordGrid;