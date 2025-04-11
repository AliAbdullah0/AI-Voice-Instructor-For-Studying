import { getCurrentUser } from "@/actions/user.actions";
import Hero from "@/components/Hero";

export default async function Home() {
    const user = await getCurrentUser();
    return <Hero user={user} />;
}