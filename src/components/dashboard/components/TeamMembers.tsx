import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


interface TeamMembersProps {
  members: any[];
}

export function TeamMembers({ members }: TeamMembersProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {members.map((member) => (
        <div key={member._id} className="flex flex-col items-center gap-2 text-center">
          <Avatar className="h-16 w-16">
            <AvatarImage src={member.image} alt={member.name} />
            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{member.name}</p>
            <p className="text-sm text-muted-foreground">{member.designation}</p>
          </div>
        </div>
      ))}
    </div>
  );
}