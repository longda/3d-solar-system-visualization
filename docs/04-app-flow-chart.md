A[App Loads] --> B{Assets Loaded?}
B -- No --> C[Show Loading Indicator]
B -- Yes --> D[Show 3D Solar System Main View]

D --> E[User Drags/Swipes Camera]
D --> F[User Zooms In/Out]
D --> G[User Clicks/Taps Planet]
D --> H[User Opens Control Panel]

G --> I[Show Planet Info Panel]
I --> J[User Closes Info Panel]
J --> D

I --> K[User Clicks Another Planet]
K --> I

H --> L[Play/Pause Animation]
H --> M[Adjust Speed Slider]
H --> N[Reset Camera]
H --> O[Toggle UI Overlays]

D --> P{Mobile Device?}
P -- Yes --> Q[Show Responsive UI & Touch Controls]
P -- No --> R[Show Desktop UI & Mouse Controls]

D --> S{Error/Edge Case?}
S -- Asset Load Failure --> T[Show Error Message & Retry]
S -- Unsupported Browser --> U[Show Upgrade Message]

D --> V[User Exits App]
