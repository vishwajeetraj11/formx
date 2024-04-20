import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function FormResponseTable({ surveyResponses }) {
  console.log({ surveyResponses });
  return (
    <>
      <div className="flex flex-row gap-x-2">
        <Input placeholder="Search Responses..." />
        <Button>Search</Button>
      </div>

      <div className="max-h-[75vh] overflow-y-auto scrollbar-hide">
        <Table>
          <TableHeader>
            <TableRow className="py-3">
              <TableHead>Full Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Sexual Orientation</TableHead>
              <TableHead>Tantra Experience</TableHead>
              <TableHead>Favorite Position</TableHead>
              <TableHead>Health Benefits</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {surveyResponses?.map((response) => (
              <TableRow key={response.id} className="py-3">
                <TableCell>{response.fullName}</TableCell>
                <TableCell>{response.age}</TableCell>
                <TableCell>{response.gender}</TableCell>
                <TableCell>{response.orientation}</TableCell>
                <TableCell>{response.tantraExperience}</TableCell>
                <TableCell>{response.favoritePosition}</TableCell>
                <TableCell>{response.healthBenefits}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
