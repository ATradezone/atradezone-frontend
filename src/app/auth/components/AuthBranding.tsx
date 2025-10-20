'use client';

const AuthBranding = () => {
  return (
    <div className="hidden md:flex md:w-full lg:w-1/2 md:h-48 lg:h-auto flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-28 text-white relative overflow-hidden" style={{
      //backgroundColor: '#000000',
    }}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat min-h-screen"
        style={{
          backgroundImage: 'url(/images/auth-bg.png)',
          minHeight: '100vh',
          //backgroundColor: '#000000',
        }}
      ></div>
      
   
      
      {/* Background overlay image */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-30 min-h-screen"
        style={{
          backgroundImage: 'url(/images/background-image-with-line-scaled.png)',
          minHeight: '100vh'
        }}
      ></div>
      
      {/* Logo - Top Left */}
      <div className="flex items-center space-x-3 relative z-10">
        <a href="https://www.atradezone.ca/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }} title="">
          <img 
            src="/images/atradezone-logo-big-size-w.png" 
            alt="ATradezone™ Cloud Logo" 
            className="h-8 sm:h-10 lg:h-12 w-auto object-contain"
          />
        </a>
      </div>
      
      {/* Description - Center Left Aligned */}
      <div className="max-w-md relative z-8 md:hidden lg:block">
        <h1 className="font-bold mb-2 leading-tight" style={{ fontFamily: "'Afacad', sans-serif" }}>
          <span style={{ fontSize: '11rem', lineHeight: '1' }}>Sync</span>
          <br />
          <span style={{ fontSize: '7rem', lineHeight: '1' }}>Everything</span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-4 lg:mb-28" style={{ color: '#DDDDDD', fontFamily: "'Afacad', sans-serif" }}>
          Eliminate repetitive tasks with automation.<br className="hidden sm:block" />Boost productivity and save tons of time effortlessly!
        </p>
      </div>
      
      {/* Copyright - Bottom Left */}
      <div className="absolute bottom-2 sm:bottom-4 lg:bottom-6 left-4 sm:left-6 md:left-8 lg:left-28 z-10">
        <p className="text-xs text-emerald-200" style={{ fontFamily: "'Afacad', sans-serif" }}>
          ©{new Date().getFullYear()} <a href="https://www.atradezone.ca/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', fontFamily: "'Afacad', sans-serif" }} title="">ATradezone™ Cloud</a>. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthBranding;