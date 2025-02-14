import { Menubar } from 'primereact/menubar';

export default function Navbar({ items }) {
    return (
        <div className="card sticky top-0 z-5">
            <Menubar
                model={items}
                pt={{
                    menu: {
                        className:
                            'lg:flex lg:flex-row lg:justify-content-center lg:w-full',
                    },
                }}
            />
        </div>
    );
}
