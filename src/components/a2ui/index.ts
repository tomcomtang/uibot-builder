/**
 * A2UI 组件索引
 * 统一导出所有 A2UI 组件
 */

// 基础组件
export { A2UIText } from './basic/Text';
export { A2UIImage } from './basic/Image';
export { A2UIButton } from './basic/Button';
export { A2UIDivider } from './basic/Divider';

// 布局组件
export { A2UIRow } from './layout/Row';
export { A2UIColumn } from './layout/Column';
export { A2UIList } from './layout/List';
export { A2UICard } from './layout/Card';

// 表单组件
export { A2UITextField } from './form/TextField';
export { A2UICheckBox } from './form/CheckBox';

// 数据组件
export { A2UIChart } from './data/Chart';
export { A2UIProgress } from './data/Progress';
export { A2UIBadge } from './data/Badge';
export { A2UIStatistic } from './data/Statistic';

// 媒体组件
export { A2UIVideo } from './media/Video';
export { A2UIAudio } from './media/Audio';
export { A2UIGallery } from './media/Gallery';

// 高级组件
export { A2UICalendar } from './advanced/Calendar';
export { A2UITimeline } from './advanced/Timeline';
export { A2UITree } from './advanced/Tree';
export { A2UICarousel } from './advanced/Carousel';

// 类型定义
export type { TextProps } from './basic/Text';
export type { ImageProps } from './basic/Image';
export type { ButtonProps } from './basic/Button';
export type { DividerProps } from './basic/Divider';
export type { RowProps } from './layout/Row';
export type { ColumnProps } from './layout/Column';
export type { ListProps } from './layout/List';
export type { CardProps } from './layout/Card';
export type { TextFieldProps } from './form/TextField';
export type { CheckBoxProps } from './form/CheckBox';
export type { ChartProps } from './data/Chart';
export type { ProgressProps } from './data/Progress';
export type { BadgeProps } from './data/Badge';
export type { StatisticProps } from './data/Statistic';
export type { VideoProps } from './media/Video';
export type { AudioProps } from './media/Audio';
export type { GalleryProps } from './media/Gallery';
export type { CalendarProps } from './advanced/Calendar';
export type { TimelineProps } from './advanced/Timeline';
export type { TreeProps } from './advanced/Tree';
export type { CarouselProps } from './advanced/Carousel';

// 导入所有组件类以便创建映射表
import { A2UIText } from './basic/Text';
import { A2UIImage } from './basic/Image';
import { A2UIButton } from './basic/Button';
import { A2UIDivider } from './basic/Divider';
import { A2UIRow } from './layout/Row';
import { A2UIColumn } from './layout/Column';
import { A2UIList } from './layout/List';
import { A2UICard } from './layout/Card';
import { A2UITextField } from './form/TextField';
import { A2UICheckBox } from './form/CheckBox';
import { A2UIChart } from './data/Chart';
import { A2UIProgress } from './data/Progress';
import { A2UIBadge } from './data/Badge';
import { A2UIStatistic } from './data/Statistic';
import { A2UIVideo } from './media/Video';
import { A2UIAudio } from './media/Audio';
import { A2UIGallery } from './media/Gallery';
import { A2UICalendar } from './advanced/Calendar';
import { A2UITimeline } from './advanced/Timeline';
import { A2UITree } from './advanced/Tree';
import { A2UICarousel } from './advanced/Carousel';

// 组件映射表
export const A2UI_COMPONENTS = {
  // 基础组件
  Text: A2UIText,
  Image: A2UIImage,
  Button: A2UIButton,
  Divider: A2UIDivider,
  
  // 布局组件
  Row: A2UIRow,
  Column: A2UIColumn,
  List: A2UIList,
  Card: A2UICard,
  
  // 表单组件
  TextField: A2UITextField,
  CheckBox: A2UICheckBox,
  
  // 数据组件
  Chart: A2UIChart,
  Progress: A2UIProgress,
  Badge: A2UIBadge,
  Statistic: A2UIStatistic,
  
  // 媒体组件
  Video: A2UIVideo,
  Audio: A2UIAudio,
  Gallery: A2UIGallery,
  
  // 高级组件
  Calendar: A2UICalendar,
  Timeline: A2UITimeline,
  Tree: A2UITree,
  Carousel: A2UICarousel,
} as const;

// 组件类型
export type A2UIComponentType = keyof typeof A2UI_COMPONENTS;