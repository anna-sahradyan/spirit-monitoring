import YokaiList from "@/features/yokai/ui/YokaiList";

export default function Home() {
    return (
        <div className={'wrapper'}>
            <main className={'container'}>
                <YokaiList/>
            </main>
        </div>
    );
}
