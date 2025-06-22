import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


interface RecentContactsProps {
  contacts: any[];
}

export function RecentContacts({ contacts }: RecentContactsProps) {
  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <div key={contact._id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>
              {contact.name
                .split(" ")
                .map((n:any) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{contact.name}</p>
            <p className="text-sm text-muted-foreground">{contact.email}</p>
          </div>
          <div className="ml-auto font-medium">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              contact.isRead 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {contact.isRead ? 'Read' : 'Unread'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}