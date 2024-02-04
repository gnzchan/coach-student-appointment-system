"use client";

import { useEffect } from "react";
import { GiWhistle } from "react-icons/gi";
import { PiStudent } from "react-icons/pi";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { switchActiveUser } from "@/lib/firebase-functions";

// USERS LIST

// const users: User[] = [
//   {
//     id: "NvEz6qRPg9",
//     name: "Robert",
//     phoneNumber: "+1 888-888-8585",
//     type: "coach",
//   },
//   {
//     id: "iD1YUo3D2Z",
//     name: "Shar",
//     phoneNumber: "+1 222-222-2222",
//     type: "coach",
//   },
//   {
//     id: "yjzO2w4Q8E",
//     name: "Ericka",
//     phoneNumber: "+1 777-777-7777",
//     type: "coach",
//   },
//   {
//     id: "4e7wH9jX2L",
//     name: "Joe",
//     phoneNumber: "+1 555-555-5555",
//     type: "student",
//   },
//   {
//     id: "Lq5gI46eUd",
//     name: "Joseph",
//     phoneNumber: "+1 123-456-7891",
//     type: "student",
//   },
//   {
//     id: "S1jOfKlTzP",
//     name: "Ken",
//     phoneNumber: "+1 555-444-4444",
//     type: "student",
//   },
// ];

const SwitchUserDropdown = ({
  activeUser,
  allUsers,
}: {
  activeUser: User;
  allUsers: User[];
}) => {
  const router = useRouter();

  const { user, users, setUser, setUsers } = useUser();
  const namePrefix = user?.type === "coach" ? "Coach" : "Student";
  const name = `${namePrefix} ${user?.name}`;

  // This can be changed to state variables, but assuming we won't add/remove current users, this should be fine
  const coaches: User[] = users.filter((u) => u.type === "coach");
  const students: User[] = users.filter((u) => u.type === "student");

  useEffect(() => {
    setUser(activeUser);
    setUsers(allUsers);
  }, [activeUser, allUsers]);

  const handleSwitchUser = async (id: string) => {
    const newUser = users.find((u) => u.id === id);
    if (newUser) {
      await switchActiveUser(newUser);
      setUser(newUser);
      router.push("/");
      router.refresh();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Switch User | {name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup
          value={user?.id}
          onValueChange={handleSwitchUser}
        >
          <DropdownMenuLabel>Coaches</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {coaches.map((coach) => (
            <DropdownMenuRadioItem key={coach.id} value={coach.id}>
              <GiWhistle size={14} className="mx-2" />
              <span>{coach.name}</span>
            </DropdownMenuRadioItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Students</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {students.map((student) => (
            <DropdownMenuRadioItem key={student.id} value={student.id}>
              <PiStudent size={14} className="mx-2" />
              <span>{student.name}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { SwitchUserDropdown };
