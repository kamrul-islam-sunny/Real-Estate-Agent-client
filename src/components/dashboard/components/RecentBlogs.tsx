import Image from "next/image";

interface BlogActivityProps {
  blogs: any[];
}

export function BlogActivity({ blogs }: BlogActivityProps) {
  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <div key={blog._id} className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Image
              src={blog.image[0]}
              alt={blog.name}
              className="h-12 w-12 rounded-lg object-cover"
              width={500}
              height={500}
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium line-clamp-1">{blog.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {blog.description.replace(/<[^>]*>/g, '')}
            </p>
            <div className="mt-1 flex flex-wrap gap-1">
              {blog.keyword.map((tag:any, i:any) => (
                <span 
                  key={i} 
                  className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {new Date(blog.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}