interface AvatarProps {
    initials: string;
}

export const Avatar = ({ initials }: AvatarProps) => {
    return (
        <div className={"w-8 h-8 bg-slate-400 rounded-full flex justify-center items-center"}>
            <div className="font-semibold">{initials}</div>
        </div>
    );
}
