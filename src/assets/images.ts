// Imports de imagens
import AfyaCardioPaper from "./afya cardio papers.png";
import AfyaCardioPapersColored from "./afya cardio papers colorido.png";

import AfyaMedCel from "./medcel afya.png";
import AfyaMedCelColored from "./medcel afya colorido.png";

import MedicalEducationColored from "./afya educacao medica colorida.png";
import MedicalEducation from "./afya educacao medica.png";

import AfyaCollege from "./afya faculdade de ciencias medicas.png";
import AfyaCollegeColored from "./afya faculdade colorida.png";

import IclinicColored from "./afya iclinic colorido.png";
import Iclinic from "./afya iclinic.png";

import WhiteBookColored from "./afya whitebook colorido.png";
import WhiteBook from "./afya whitebook.png";

import TouchScreen from "./touchscreen.png";
import Afya from "./afya.png";
import WhiteBookCell from "./whitebook-app.webp";
import MedcelCell from "./celular.png";

import MedicalEducationGirl from "./pessoa1.png";
import Pessoa2 from "./pessoa2.png";
import Pessoa3 from "./pessoa3-alt.jpeg";
import Pessoa4 from "./pessoa4.png";
import Pessoa5 from "./pessoa5.png";
import Pessoa7 from "./pessoa7.png";
import Pessoa8 from "./pessoa8.png";
import Pessoa9 from "./pessoa9.png";

import Rosa from "./rosa.png";
import Estrela from "./estrela.png";

// ✅ Nova imagem de acerto
import AcertoBox from "./acerto-box.png";

// Exporta individualmente se necessário em outros arquivos
export {
  AfyaCardioPaper,
  AfyaMedCel,
  AfyaMedCelColored,
  AfyaCollege,
  Iclinic,
  IclinicColored,
  MedicalEducation,
  MedicalEducationColored,
  WhiteBook,
  WhiteBookColored,
  Afya,
  TouchScreen,
  WhiteBookCell,
  MedcelCell,
};

// Lista de imagens centralizadas
export const srcList = {
  AfyaWhitebook: WhiteBook,
  AfyaWhitebookColored: WhiteBookColored,
  Afya: Afya,
  AfyaCollege: AfyaCollege,
  AfyaCollegeColored: AfyaCollegeColored,
  AfyaCardioPapers: AfyaCardioPaper,
  AfyaCardioPapersColored: AfyaCardioPapersColored,
  AfyaIclinic: Iclinic,
  AfyaIclinicColored: IclinicColored,
  AfyaMedcel: AfyaMedCel,
  AfyaMedcelColored: AfyaMedCelColored,
  MedicalEducation: MedicalEducation,
  MedicalEducationColored: MedicalEducationColored,
  WhiteBookCell: WhiteBookCell,
  MedcelCell: MedcelCell,
  MedicalEducationGirl: MedicalEducationGirl,
  Pessoa2: Pessoa2,
  Pessoa3: Pessoa3,
  Pessoa4: Pessoa4,
  Pessoa5: Pessoa5,
  Pessoa7: Pessoa7,
  Pessoa8: Pessoa8,
  Pessoa9: Pessoa9,
  Rosa: Rosa,
  Estrela: Estrela,
  AcertoBox: AcertoBox, // ✅ imagem de parabéns adicionada aqui
} as const;

// Tipagem para uso de chave segura
export type SrcListKeys = keyof typeof srcList;
