import { Menubar } from 'primereact/menubar';

export default function Navbar({ items }) {
    return (
        <div className="card">
            <Menubar
                model={items}
                className="surface-0 shadow-4 border-solid"
                pt={{
                    root: { className: 'p-3' },
                    menu: {
                        className: 'flex justify-content-center w-full gap-8',
                    },
                    button: { className: 'text-lg' },
                }}
            />
        </div>
    );
}
