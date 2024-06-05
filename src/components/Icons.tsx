import {
  ChevronLeft,
  LucideProps,
  Moon,
  Plus,
  Settings,
  SunMedium,
  Loader2,
  type LucideIcon,
  Ellipsis,
  Pencil,
  Trash2,
  ChevronDown,
  X,
  ChevronRight,
  Check,
  DotSquare,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  settings: Settings,
  add: Plus,
  sun: SunMedium,
  moon: Moon,
  spinner: Loader2,
  ellipsis: Ellipsis,
  pencil: Pencil,
  delete: Trash2,
  X: X,
  check: Check,
  dotFilled: DotSquare,
  chevronDown: ChevronDown,
  checmarkCircle: ({ ...props }: LucideProps) => (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-3"
    >
      <path
        d="M14.125 7.75L8.62497 13L5.875 10.375M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
        stroke=""
        className="stroke-paragraph dark:stroke-primary"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  facebook: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="30"
      height="30"
      viewBox="0 0 30 30"
    >
      <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h10v-9h-3v-3h3v-1.611C16,9.339,17.486,8,20.021,8 c1.214,0,1.856,0.09,2.16,0.131V11h-1.729C19.376,11,19,11.568,19,12.718V14h3.154l-0.428,3H19v9h5c1.105,0,2-0.895,2-2V6 C26,4.895,25.104,4,24,4z"></path>
    </svg>
  ),
  linkedin: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="30"
      height="30"
      viewBox="0 0 30 30"
    >
      <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"></path>
    </svg>
  ),
  twitter: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="30"
      height="30"
      viewBox="0 0 30 30"
    >
      <path d="M 6 4 C 4.895 4 4 4.895 4 6 L 4 24 C 4 25.105 4.895 26 6 26 L 24 26 C 25.105 26 26 25.105 26 24 L 26 6 C 26 4.895 25.105 4 24 4 L 6 4 z M 8.6484375 9 L 13.259766 9 L 15.951172 12.847656 L 19.28125 9 L 20.732422 9 L 16.603516 13.78125 L 21.654297 21 L 17.042969 21 L 14.056641 16.730469 L 10.369141 21 L 8.8945312 21 L 13.400391 15.794922 L 8.6484375 9 z M 10.878906 10.183594 L 17.632812 19.810547 L 19.421875 19.810547 L 12.666016 10.183594 L 10.878906 10.183594 z"></path>
    </svg>
  ),
  search: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="search"
      role="img"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.11278 0C14.1369 0 18.2245 4.08758 18.2245 9.11278C18.2245 11.2861 17.4592 13.5472 16.1845 14.8512L20 18.6667L18.6667 20L14.8512 16.1856C13.5667 17.4603 11.2861 18.2245 9.11278 18.2245C4.08758 18.2245 0 14.1369 0 9.11278C0 4.08758 4.08758 0 9.11278 0ZM9.11278 16.3395C13.0974 16.3395 16.3395 13.0974 16.3395 9.11278C16.3395 5.12818 13.0974 1.88608 9.11278 1.88608C5.12709 1.88608 1.88499 5.12818 1.88499 9.11278C1.88499 13.0974 5.12709 16.3395 9.11278 16.3395Z"
        fill=""
        className="fill-paragraph dark:fill-white"
      />
    </svg>
  ),
  menu: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="menu"
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={14}
      viewBox="0 0 22 14"
      fill="none"
      {...props}
    >
      <path
        d="M0 1C0 0.447715 0.447715 0 1 0H21C21.5523 0 22 0.447715 22 1C22 1.55228 21.5523 2 21 2H1C0.447716 2 0 1.55228 0 1Z"
        fill=""
        className="fill-paragraph dark:fill-white"
      />
      <path
        d="M8 7C8 6.44772 8.44772 6 9 6H21C21.5523 6 22 6.44772 22 7C22 7.55228 21.5523 8 21 8H9C8.44772 8 8 7.55228 8 7Z"
        fill=""
        className="fill-paragraph dark:fill-white"
      />
      <path
        d="M4 13C4 12.4477 4.44772 12 5 12H21C21.5523 12 22 12.4477 22 13C22 13.5523 21.5523 14 21 14H5C4.44772 14 4 13.5523 4 13Z"
        fill=""
        className="fill-paragraph dark:fill-white"
      />
    </svg>
  ),
  google: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M21.7502 12.216C21.7502 11.4143 21.6839 10.8293 21.5402 10.2227H12.1992V13.8409H17.6822C17.5717 14.7401 16.9747 16.0943 15.6482 17.0043L15.6296 17.1254L18.583 19.3676L18.7876 19.3877C20.6669 17.6868 21.7502 15.1843 21.7502 12.216Z"
        fill="#4285F4"
      />
      <path
        d="M12.2002 21.7495C14.8864 21.7495 17.1415 20.8828 18.7886 19.3878L15.6492 17.0044C14.8091 17.5786 13.6815 17.9794 12.2002 17.9794C9.56932 17.9794 7.33635 16.2786 6.54036 13.9277L6.42369 13.9374L3.35266 16.2666L3.3125 16.3761C4.94853 19.5611 8.30907 21.7495 12.2002 21.7495Z"
        fill="#34A853"
      />
      <path
        d="M6.53907 13.9286C6.32904 13.322 6.20749 12.6719 6.20749 12.0003C6.20749 11.3286 6.32904 10.6786 6.52802 10.072L6.52246 9.94276L3.41294 7.57617L3.3112 7.6236C2.63691 8.94528 2.25 10.4295 2.25 12.0003C2.25 13.5711 2.63691 15.0553 3.3112 16.3769L6.53907 13.9286Z"
        fill="#FBBC05"
      />
      <path
        d="M12.2003 6.01997C14.0685 6.01997 15.3286 6.8108 16.0472 7.47168L18.855 4.785C17.1306 3.21417 14.8865 2.25 12.2003 2.25C8.3091 2.25 4.94854 4.43832 3.3125 7.62329L6.52933 10.0717C7.33638 7.72083 9.56936 6.01997 12.2003 6.01997Z"
        fill="#EB4335"
      />
    </svg>
  ),
};
