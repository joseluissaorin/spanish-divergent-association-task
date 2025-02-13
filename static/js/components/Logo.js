const Logo = () => (
    <div className="flex justify-center mb-6">
      <svg className="w-12 h-12" viewBox="0 0 100 100">
        <polygon 
          points="50,10 90,30 90,70 50,90 10,70 10,30" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        />
      </svg>
    </div>
  );

// Make Logo component globally available
window.Logo = Logo;