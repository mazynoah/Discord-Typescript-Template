import { EmbedBuilder } from "discord.js";

export default class EmbedPage {
    private pages: EmbedBuilder[] = [];
    private currentPage: number = 0;

    constructor(embeds?: EmbedBuilder[]) {
        embeds ? this.setPages(embeds) : this.clearPages();
    }

    public getCurrentPage(): EmbedBuilder {
        return this.pages[this.currentPage];
    }

    public nextPage(): EmbedBuilder {
        this.currentPage++;
        if (this.currentPage >= this.pages.length)
            this.currentPage = 0;
        return this.getCurrentPage();
    }

    public previousPage(): EmbedBuilder {
        this.currentPage--;
        if (this.currentPage < 0)
            this.currentPage = this.pages.length - 1;
        return this.getCurrentPage();
    }

    public setPage(page: number): EmbedBuilder {
        this.currentPage = page;
        return this.getCurrentPage();
    }

    public getPageCount(): number {
        return this.pages.length;
    }

    public getPageNumber(): number {
        return this.currentPage;
    }

    public getPages(): EmbedBuilder[] {
        return this.pages;
    }

    public setPages(pages: EmbedBuilder[]): void {
        this.pages = pages;
    }

    public addPage(page: EmbedBuilder): void {
        this.pages.push(page);
    }

    public removePage(page: EmbedBuilder): void {
        this.pages.splice(this.pages.indexOf(page), 1);
    }

    public removePageAt(index: number): void {
        this.pages.splice(index, 1);
    }

    public clearPages(): void {
        this.pages = [];
    }

    public getPageIndex(page: EmbedBuilder): number {
        return this.pages.indexOf(page);
    }
}