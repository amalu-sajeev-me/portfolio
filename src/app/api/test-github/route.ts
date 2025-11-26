import { NextResponse } from 'next/server';
import { getPinnedRepos } from '@/lib/github';

export async function GET() {
    try {
        const repos = await getPinnedRepos('amalu-sajeev-me');

        return NextResponse.json({
            success: true,
            count: repos.length,
            repos: repos
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
