import { useRouter } from 'next/router';
import { getSessionId } from '@/utils/utils';

export default function Navbar() {
    const router = useRouter();

    const handleClick = async () => {
        const clientId = process.env.ATLASSIAN_CLIENT_ID;
        const { sessionId }  = await getSessionId();
        const url = `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${clientId}&scope=offline_access%20read%3Ajira-work%20write%3Ajira-work%20read%3Ajira-user&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2FgetToken&state=${sessionId}&response_type=code&prompt=consent`;
        router.push(url);
    }

    return (
        <div className="absolute inset-x-0 top-0 z-50">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="http://localhost:3000" className="flex items-center">
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Storypoints</span>
                    </a>
                </div>
                <div className="lg:flex lg:flex-1 lg:justify-end">
                    <a href="#" className="text-l font-semibold leading-6 text-white outline-2 outline-white" onClick={() => handleClick()}>
                        Log in <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
        </div>
    )
}