const EKalpLogo = ({ showTagline = true, className = "" }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Logo Icon */}
      <svg
        width="260"
        height="190"
        viewBox="0 0 260 190"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-52 sm:w-60"
      >
        {/* Left Person / Citizen */}
        <circle cx="65" cy="72" r="20" fill="#123B68" />

        <path
          d="M39 113C39 94 50 84 65 84C80 84 91 94 91 113V128H39V113Z"
          fill="#123B68"
        />

        {/* Citizen speech bubble */}
        <rect
          x="23"
          y="38"
          width="67"
          height="38"
          rx="13"
          fill="#F97316"
        />

        <path
          d="M47 76L47 87L59 76H47Z"
          fill="#F97316"
        />

        <circle cx="42" cy="57" r="3.5" fill="white" />
        <circle cx="56" cy="57" r="3.5" fill="white" />
        <circle cx="70" cy="57" r="3.5" fill="white" />

        {/* Right Student */}
        <circle cx="194" cy="72" r="19" fill="#123B68" />

        {/* Graduation Cap */}
        <path
          d="M166 55L194 38L222 55L194 70L166 55Z"
          fill="#123B68"
        />

        <path
          d="M177 60V70C177 76 187 80 194 80C201 80 211 76 211 70V60"
          stroke="white"
          strokeWidth="4"
        />

        {/* Student body */}
        <path
          d="M169 112C169 94 179 84 194 84C209 84 219 94 219 112V128H169V112Z"
          fill="#123B68"
        />

        {/* Laptop */}
        <rect
          x="173"
          y="101"
          width="43"
          height="27"
          rx="4"
          fill="#0F3158"
        />

        <circle cx="194.5" cy="114.5" r="4" fill="white" />

        {/* Central Lightbulb */}
        <circle cx="130" cy="65" r="29" fill="#FDBA2D" />

        <path
          d="M116 70C116 60 122 54 130 54C138 54 144 60 144 70C144 76 141 81 137 85V94H123V85C119 81 116 76 116 70Z"
          fill="#FDBA2D"
        />

        {/* Bulb base */}
        <path
          d="M123 94H137V100H123V94Z"
          fill="#123B68"
        />

        {/* Bulb rays */}
        <path
          d="M130 25V13"
          stroke="#FDBA2D"
          strokeWidth="6"
          strokeLinecap="round"
        />

        <path
          d="M98 36L89 27"
          stroke="#FDBA2D"
          strokeWidth="6"
          strokeLinecap="round"
        />

        <path
          d="M162 36L171 27"
          stroke="#FDBA2D"
          strokeWidth="6"
          strokeLinecap="round"
        />

        <path
          d="M91 65H79"
          stroke="#FDBA2D"
          strokeWidth="6"
          strokeLinecap="round"
        />

        <path
          d="M169 65H181"
          stroke="#FDBA2D"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Idea filament */}
        <path
          d="M124 70C124 63 126 59 130 59C134 59 136 63 136 70"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <path
          d="M130 59V90"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Collaboration swooshes */}
        <path
          d="M36 127C55 151 91 159 115 142C102 159 76 170 52 157C42 152 34 141 29 130L36 127Z"
          fill="#22A878"
        />

        <path
          d="M224 127C211 151 181 160 157 145C170 160 195 170 216 158C227 152 233 141 230 129L224 127Z"
          fill="#2385C5"
        />
      </svg>

      {/* Brand Name */}
      <div className="flex items-baseline -mt-2">
        <span className="text-6xl font-extrabold tracking-tight text-[#22A878]">
          e
        </span>

        <span className="text-6xl font-extrabold tracking-tight text-[#123B68]">
          -kalp
        </span>
      </div>

      {/* Tagline */}
      {showTagline && (
        <p className="mt-2 text-center text-xs sm:text-sm font-medium tracking-wide text-[#123B68]">
          Real Problems
          <span className="mx-2">|</span>
          Young Minds
          <span className="mx-2">|</span>
          Better Tomorrows
        </p>
      )}
    </div>
  );
};

export default EKalpLogo;