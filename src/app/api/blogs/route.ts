import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const strapiURL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs?populate=*`;
    const blogResponse = await fetch(strapiURL);
    const blogData = await blogResponse.json();
    
    console.log(blogData);
    
    return NextResponse.json(
      {
        data: blogData,
      },
      {
        // Set Cache-Control header to disable caching
        headers: {
          // Disable caching by setting Cache-Control header
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error: any) {
    console.error("Error retrieving stories:", error);
    return NextResponse.json(
      {
        message: "Failed to retrieve stories",
        error: "Server error",
      },
      { status: 500 }
    );
  }
}
