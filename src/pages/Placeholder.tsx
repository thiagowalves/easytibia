import { Page } from "../components/Page";
import { Crumb } from "../components/Topbar";
import { PageTitle, PageSub } from "../components/ui";

/** Tela ainda não implementada — mantém a navegação funcionando. */
export function Placeholder({ title }: { title: string }) {
  return (
    <Page crumb={<Crumb current={title} />}>
      <PageTitle>{title}</PageTitle>
      <div className="mt-4">
        <PageSub>Esta seção ainda está em construção. O MVP começa pelas calculadoras.</PageSub>
      </div>
    </Page>
  );
}
