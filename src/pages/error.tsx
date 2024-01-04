import { Head } from "../components/head";

function Error() {
    return (
        <>
            <Head title="Not Found" />
            <section class="flex flex-col items-center mt-32">
                <h1 class="text-4xl font-bold mb-8">Page Not Found</h1>
                <p>The page you are looking for could not be found.</p>
            </section>
        </>
    )
}

export { Error };