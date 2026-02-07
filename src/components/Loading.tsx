import animations from "./animations.module.css";


export function Loading() {
    return (
        <div className="h-[90vh] max-w-screen flex items-center justify-center">
            <div className={animations["loader-l43"]} />
        </div>
    )
}