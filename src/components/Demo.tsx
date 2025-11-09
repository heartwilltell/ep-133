import { Button } from "@/components/ui/button";

export default function Demo() {
  return (
    <div className="flex flex-col gap-4 max-w-md">
      <h2 className="text-2xl font-semibold">shadcn/ui Button Demo</h2>
      <div className="flex flex-wrap gap-2">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>
  );
}
