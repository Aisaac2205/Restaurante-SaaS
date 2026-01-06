import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const salesData = [
    { name: 'Lun', value: 4000 },
    { name: 'Mar', value: 3000 },
    { name: 'Mie', value: 2000 },
    { name: 'Jue', value: 2780 },
    { name: 'Vie', value: 1890 },
    { name: 'Sab', value: 2390 },
    { name: 'Dom', value: 3490 },
];

const productData = [
    { name: 'Whopper', sales: 120 },
    { name: 'Papas', sales: 98 },
    { name: 'Soda', sales: 86 },
    { name: 'Nuggets', sales: 55 },
];

const channelData = [
    { name: 'Local', value: 400 },
    { name: 'Delivery', value: 300 },
    { name: 'Pickup', value: 100 },
];

const COLORS = ['#000000', '#525252', '#a3a3a3']; // Black -> Gray 600 -> Gray 400

export const DashboardCharts = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart 1: Sales Trend (Area) */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm col-span-1 lg:col-span-2 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Tendencia de Ventas (Semanal)</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={salesData}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#000000" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                                cursor={{ stroke: '#000', strokeWidth: 1 }}
                            />
                            <Area type="monotone" dataKey="value" stroke="#000000" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Chart 2: Traffic Source (Pie) */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Canales de Venta</h3>
                <div className="h-[300px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={channelData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {channelData.map((_entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '8px', color: '#fff' }} />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Center Text Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-3xl font-bold text-gray-900">800</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">Total</span>
                    </div>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                    {channelData.map((entry, index) => (
                        <div key={entry.name} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                            <span className="text-xs text-gray-500">{entry.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chart 3: Top Products (Bar) - Full Width Bottom */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm col-span-1 lg:col-span-3 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Productos Más Vendidos</h3>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={productData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e5e5" />
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="name"
                                type="category"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#000', fontSize: 13, fontWeight: 500 }}
                                width={100}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '8px', color: '#fff' }}
                                cursor={{ fill: '#f5f5f5' }}
                            />
                            <Bar dataKey="sales" fill="#000000" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
