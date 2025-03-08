import { useGetStudySets } from "../hooks";

export const StudySets = () => {
    const { data: studySets } = useGetStudySets();
    
    return (
        <ul className="ml-9">
            {studySets?.map((s, index) => {
                return (
                    <li key={index}>
                        <p>{s.title}</p>
                        <p>{s.description}</p>
                    </li>
                );
            })}
        </ul>
    );
};
