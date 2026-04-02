export default function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black font-headline text-on-surface mb-2">
          Course Details
        </h1>
        <p className="text-on-surface-variant mb-8">
          Course ID: {params.id}
        </p>
        <div className="glass-card p-12 rounded-3xl text-center">
          <p className="text-on-surface-variant">
            Course Detail page coming soon — Modules & Lessons hierarchy, Video
            Player, PDF Downloads, Progress Tracking.
          </p>
        </div>
      </div>
    </div>
  );
}
