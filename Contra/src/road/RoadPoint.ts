module yjtx {
    export var totalX:number;//当前总共走的 x 的值
    
    export var preRoads:Array<Roads>;//人已经走过但是还未被清理的路段
    
    export var currentRoad:Roads;//当前人物所在的路段
    
    export var leftRoads:Array<Roads>;//还未经过的路
    
    export function run(stepX:number, stepY:number):void {
        if (stepX > 0) {
            if (totalX + stepX > currentRoad.endX) {
                
            }
        }
    }
    
    //一段路的数据
    export class Roads {
        startX:number;
        endX:number;
        
        roads:Array<RoadPoint>;//同一段上有多少路
    }
    
    //一条路的数据
    export class RoadPoint {
        startY:number;
        obliquity:number;//倾斜度，水平就是 0, 垂直 90，如果是垂直需要判断 y 是否在可走区域范围内
        
        endY:number;
        
    }
}