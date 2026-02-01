import { Link } from 'react-router-dom';

// 1. Define the data interface
interface VisualizationItem {
  id: string;
  title: string;
  image: string;
  link?: string; // Optional: where it goes when clicked
}

// 2. Mock Data (Matching your screenshot)
const visualizations: VisualizationItem[] = [
  {
    id: '1',
    title: 'Real estate prices',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    link: '/globe',
  },
  {
    id: '2',
    title: 'Earth quakes',
    image: 'https://img.freepik.com/free-vector/earthquake-concept-illustration_114360-1557.jpg?w=800', // Vector style match
    link: '/globe',
  },
  {
    id: '3',
    title: 'Sample',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800', // Tomato
    link: '/globe',
  },
  {
    id: '4',
    title: 'Populations',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&q=80&w=800', // Crowd/Abstract
    link: '/globe',
  },
  {
    id: '5',
    title: 'Sample',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800',
    link: '/globe',
  },
  {
    id: '6',
    title: 'Sample',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800',
    link: '/globe',
  },
];

// 3. Reusable Card Component
const DashboardCard = ({ item }: { item: VisualizationItem }) => {
  return (
    <div 
      className="group flex h-40 w-full cursor-pointer overflow-hidden rounded-md bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100"
    >
      {/* Left Side: Image */}
      <div className="w-2/5 overflow-hidden relative">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Subtle overlay for better contrast if needed */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
      </div>

      {/* Right Side: Content */}
      <div className="flex w-3/5 items-center justify-center bg-zinc-50/50 p-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {item.title}
        </h3>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <section className="w-full bg-white px-6 py-12 md:px-12 lg:px-24 min-h-screen">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-10 border-b border-gray-200 pb-4">
          <div className="flex items-baseline gap-4">
            <h1 className="font-serif text-5xl text-black">
              3D visualizations
            </h1>
            <span className="text-sm font-medium text-gray-500 font-sans">
              {visualizations.length} items
            </span>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visualizations.map((item) => (
            <Link to={item.link || '#'} key={item.id} className="no-underline">
                <DashboardCard key={item.id} item={item} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}