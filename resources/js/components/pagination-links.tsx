import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

type PaginationLinkItem = {
    url: string | null;
    label: string;
    active: boolean;
};

function isPreviousLink(link: PaginationLinkItem): boolean {
    return link.label.includes('Previous');
}

function isNextLink(link: PaginationLinkItem): boolean {
    return link.label.includes('Next');
}

function stripHtml(label: string): string {
    return label.replace(/<[^>]+>/g, '').trim();
}

function PaginationAnchor({
    href,
    isActive = false,
    children,
}: {
    href: string;
    isActive?: boolean;
    children: ReactNode;
}) {
    return (
        <PaginationLink asChild isActive={isActive}>
            <Link href={href} preserveScroll>
                {children}
            </Link>
        </PaginationLink>
    );
}

export default function PaginationLinks({
    links,
}: {
    links: PaginationLinkItem[];
}) {
    if (links.length <= 3) {
        return null;
    }

    const previousLink = links.find(isPreviousLink);
    const nextLink = links.find(isNextLink);
    const pageLinks = links.filter(
        (link) => !isPreviousLink(link) && !isNextLink(link),
    );

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {previousLink?.url ? (
                        <PaginationPrevious asChild>
                            <Link href={previousLink.url} preserveScroll />
                        </PaginationPrevious>
                    ) : (
                        <PaginationPrevious
                            className="pointer-events-none opacity-50"
                            href="#"
                        />
                    )}
                </PaginationItem>

                {pageLinks.map((link) => (
                    <PaginationItem key={`${link.label}-${link.url}`}>
                        {stripHtml(link.label) === '...' ? (
                            <PaginationEllipsis />
                        ) : link.url ? (
                            <PaginationAnchor
                                href={link.url}
                                isActive={link.active}
                            >
                                {stripHtml(link.label)}
                            </PaginationAnchor>
                        ) : (
                            <PaginationLink
                                className="pointer-events-none"
                                isActive
                            >
                                {stripHtml(link.label)}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    {nextLink?.url ? (
                        <PaginationNext asChild>
                            <Link href={nextLink.url} preserveScroll />
                        </PaginationNext>
                    ) : (
                        <PaginationNext
                            className="pointer-events-none opacity-50"
                            href="#"
                        />
                    )}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
