import type { SrcListKeys } from "../assets/images";

export type Question = {
  id: string;
  text: string;
  product: SrcListKeys;
  tag: string; // NFC TAG ID (mock por enquanto)
};

// Objeto com os grupos da jornada médica
export const questionMap = {
  "Estudantes": [
    {
      id: "q1",
      text: "Preparação para Residência Médica",
      product: "AfyaMedcel",
      tag: "tag1",
    },
    {
      id: "q2",
      text: "Suporte à decisão clínica no dia a dia",
      product: "AfyaWhitebook",
      tag: "tag2",
    },
  ],
  Generalista: [
    {
      id: "q1",
      text: "Suporte à decisão clínica no dia a dia",
      product: "AfyaWhitebook",
      tag: "tag1",
    },
    {
      id: "q2",
      text: "Preparação para Residência Médica",
      product: "AfyaMedcel",
      tag: "tag2",
    },
    {
      id: "q3",
      text: "Gestão para clínicas e consultórios",
      product: "AfyaIclinic",
      tag: "tag3",
    },
    {
      id: "q4",
      text: "Preparação para prova de títulos e cursos de atualização",
      product: "AfyaCardioPapers",
      tag: "tag4",
    },
    {
      id: "q5",
      text: "Pós-graduação e Educação continuada",
      product: "MedicalEducation",
      tag: "tag5",
    },
  ],
  Especialista: [
    {
      id: "q1",
      text: "Suporte à decisão clínica no dia a dia",
      product: "AfyaWhitebook",
      tag: "tag1",
    },
    {
      id: "q2",
      text: "Gestão para clínicas e consultórios",
      product: "AfyaIclinic",
      tag: "tag2",
    },
    {
      id: "q3",
      text: "Atualização científica e conteúdos especializados",
      product: "AfyaCardioPapers",
      tag: "tag3",
    },
    {
      id: "q4",
      text: "Pós-graduação e Educação continuada",
      product: "MedicalEducation",
      tag: "tag4",
    },
  ],
  "Outras áreas da saúde": [
    {
      id: "q1",
      text: "Suporte à decisão clínica no dia a dia",
      product: "AfyaWhitebook",
      tag: "tag1",
    },
    {
      id: "q2",
      text: "Graduação em Medicina",
      product: "AfyaCollege",
      tag: "tag2",
    },
  ],
} as const satisfies Record<string, Question[]>;

// ✅ Tipo do objeto inteiro
export type QuestionMap = typeof questionMap;

// ✅ Tipo seguro para as chaves (usado no SelectionContext e BigHub)
export type GroupKey = keyof QuestionMap;
