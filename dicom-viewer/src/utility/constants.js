import {
    AngleIcon,
    AnnotateIcon,
    ArrowsIcon,
    BarsIcon, DeleteIcon,
    EllipseIcon, ExportIcon,
    FillIcon, ImportIcon,
    LengthIcon,
    LevelIcon,
    PentagonIcon,
    RedoIcon,
    ResetIcon,
    SquareIcon,
    UndoIcon,
    PrintIcon
} from "../assets/icons";

import {PlainIcon, InvPlainIcon, RainbowIcon, HotIcon, HotMetalBlueIcon} from "../assets/icons";

export const viewerTools = [
    {id: 'zoomAndPan', name: 'ZoomAndPan', Icon: ArrowsIcon},
    {id: 'windowLevel', name: 'WindowLevel', Icon: LevelIcon},
    {id: 'scroll', name: 'Scroll', Icon: BarsIcon},
]

export const drawTools = [
    {id: 'drawRectangle', name: 'Draw', option: 'Rectangle', Icon: SquareIcon},
    {id: 'drawEllipse', name: 'Draw', option: 'Ellipse', Icon: EllipseIcon},
    {id: 'drawRoi', name: 'Draw', option: 'Roi', Icon: PentagonIcon},
    {id: 'drawFloodfill', name: 'Floodfill', Icon: FillIcon},
    {id: 'drawArrow', name: 'Draw', option: 'Arrow', Icon: AnnotateIcon},
    {id: 'drawRuler', name: 'Draw', option: 'Ruler', Icon: LengthIcon},
    {id: 'drawProtractor', name: 'Draw', option: 'Protractor', Icon: AngleIcon},
]

export const historyActions = [
    {id: 'undo', name: 'undo', Icon: UndoIcon},
    {id: 'resetDisplay', name: 'resetDisplay', Icon: ResetIcon},
    {id: 'redo', name: 'redo', Icon: RedoIcon},
]

export const colorMapOptions = [
    {id: 'plain', name: 'plain', Icon: PlainIcon},
    {id: 'invplain', name: 'invplain', Icon: InvPlainIcon},
    {id: 'hot', name: 'hot', Icon: HotIcon},
    {id: 'hotmetalblue', name: 'hotmetalblue', Icon: HotMetalBlueIcon},
    {id: 'rainbow', name: 'rainbow', Icon: RainbowIcon},
]

export const viewerActions = [
    {id: 'delete', Icon: DeleteIcon},
    {id: 'export', Icon: ExportIcon},
    {id: 'import', Icon: ImportIcon},
]

export const defaultColorScheme = {color: '#babdc5', background: '#ffffff'};
export const fullScreenColorScheme = {color: '#8dd04d', background: '#000000'};

export const displayModes = {
    full: 'full',
    edit: 'edit',
    view: 'view',
    base: 'base'
}