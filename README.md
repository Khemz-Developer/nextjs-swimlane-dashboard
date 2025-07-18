# Next.js Swimlane Dashboard

A **pixel-perfect, responsive swimlane task dashboard** built with **Next.js, TailwindCSS, Zustand**, and **drag-and-drop functionality** based on a provided Figma mockup.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/nextjs-swimlane-dashboard.git
cd nextjs-swimlane-dashboard
```

2️⃣ Install Dependencies
bash
Copy
Edit
npm install
# or
yarn install
3️⃣ Run the Development Server
bash
Copy
Edit
npm run dev
# or
yarn dev
Open http://localhost:3000 in your browser to view the application.

✨ Features
✅ Pixel-perfect UI based on Figma mockup
✅ Responsive design (up to at least 768px)
✅ TailwindCSS styling
✅ Swimlane-based task display by status
✅ Drag-and-drop to move tasks between swimlanes
✅ Zustand for state management
✅ Prepopulated mock API data via JSON
✅ LocalStorage persistence across reloads
✅ Live search to filter tasks dynamically
✅ Cross-browser compatible

🗂️ Project Structure
ruby
Copy
Edit
📂 public/
    mock-tasks.json         # Mock API data
📂 components/
    Swimlane.tsx            # Swimlane column component
    TaskCard.tsx            # Task card component
    SearchBar.tsx           # Search bar component
📂 store/
    useTaskStore.ts         # Zustand store for task state management
📂 pages/
    index.tsx               # Main dashboard page
tailwind.config.js
postcss.config.js
next.config.js
package.json
tsconfig.json
README.md
🛠️ Tech Stack
Next.js – React framework

TailwindCSS – Utility-first CSS framework

Zustand – State management

TypeScript – Type safety

localStorage – Data persistence

react-beautiful-dnd / dnd-kit – Drag-and-drop functionality

📊 Features in Detail
✅ Drag-and-drop: Move tasks between swimlanes to update their status.
✅ Persistence: Tasks persist across page reloads using localStorage.
✅ Search: Filter tasks in real-time while typing in the search bar.
✅ Responsive & pixel-perfect UI: Aligned with the provided Figma design.

📥 Data
The initial data is loaded from public/mock-tasks.json.

On the first load, data is fetched from the mock JSON file and stored in localStorage.

On subsequent loads, data is retrieved from localStorage, ensuring persistence across reloads.

📝 Commit Guidelines
Please commit incrementally throughout your development:

chore: initialize Next.js with TailwindCSS

feat: add Zustand store for tasks

feat: implement Swimlane layout

feat: drag-and-drop functionality

feat: search functionality

style: pixel-perfect Tailwind styling

docs: add README

🤝 Contributing
If you wish to improve this project:

Fork the repository.

Create your feature branch: git checkout -b feature/feature-name

Commit your changes: git commit -m 'feat: add feature'

Push to your branch: git push origin feature/feature-name

Open a Pull Request.

📄 License
This project is built for technical test submission purposes.

📧 Contact
For questions or clarifications, please reach out upon submission.

Happy Coding 🚀!

yaml
Copy
Edit

---

✅ **What to do now:**

1️⃣ Go to your GitHub repository → `README.md` → `Edit`.  
2️⃣ Copy-paste the above content **as is**.  
3️⃣ Commit with:
docs: add detailed README

vbnet
Copy
Edit

Let me know if you want me to generate your **`package.json`, `tailwind.config.js`, and a starter `index.tsx`** to speed up your test implementation next.







Ask ChatGPT
