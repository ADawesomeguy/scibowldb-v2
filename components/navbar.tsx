import SignInButton from "./signInButton";

export default function Navbar() {
    return (
        <div className={'container mx-auto my-3'}>
            <div className={'flex flex-row justify-between'}>
                <div>
                    <a href={'/'}>SBDBv2</a>
                </div>
                <div>
                    <SignInButton />
                </div>
            </div>
        </div>
    )
}