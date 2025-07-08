import animations from "./animations.module.css";


export function Loading() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className={animations["loader-l43"]} />
        </div>
    )
}