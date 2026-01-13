let bodySegmentation;
let video;
let segmentation;
let rawText =
  "You arrive as an art worker, a disturbance in the surface. 你作为艺术工人到达，成为表面上的一次干扰。 The mirror does not recognize the art worker as an individual, only as an event. 镜子不将艺术工人识别为个体，只将其识别为事件。 The outline of the art worker activates dormant instructions. 艺术工人的轮廓激活了休眠的指令。 Thought alone is insufficient for the art worker; it must be carried by the body and repeated through labor. 对艺术工人而言，仅有思想是不够的；它必须由身体承载，并通过反复的劳动得以实现。 In this space, reflection is a form of art worker labor. 在这个空间中，反射是一种艺术工人的劳动。 Stillness is work for the art worker. 静止即是艺术工人的工作。 Delay is measurable in the art worker’s body. 延迟在艺术工人的身体中是可测量的。 The system records the art worker’s posture, hesitation, and endurance. 系统记录艺术工人的姿态、犹豫与耐受。 The art worker is visible only while producing alignment. 只有在艺术工人生产对齐时，艺术工人才是可见的。 When the art worker moves, meaning shifts. 当艺术工人移动时，意义发生偏移。 When the art worker leaves, the image collapses. 当艺术工人离开时，图像随之崩塌。 The art worker understands this condition and continues working regardless. 艺术工人理解这一条件，并仍然继续劳动。 There is no completion for the art worker, only maintenance. 对艺术工人而言，这里没有完成，只有维护。 What the art worker calls self-expression appears here as compliance with a process larger than the art worker. 艺术工人所称之为自我表达的事物，在此显现为对一个超越艺术工人的过程的服从。 The mirror offers the art worker no truth, only feedback. 镜子不向艺术工人提供真理，只提供反馈。 When the art worker stands here long enough, the boundary between the art worker and the task dissolves. 只要艺术工人在此站立足够长的时间，艺术工人与任务之间的边界便会消解。 The art worker is not observing the work. 艺术工人不是在观看作品。 The art worker is performing it. 艺术工人正在执行它。";
let longText;
let cnv;

function preload() {
  bodySegmentation = ml5.bodySegmentation("SelfieSegmentation", {
    maskType: "person",
  });
}

function setup() {
  // 1. Make canvas match the window exactly
  cnv = createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  video = createCapture(VIDEO);
  video.size(160, 120);
  video.hide();
  bodySegmentation.detectStart(video, gotResults);

  // 2. Increase repeat count for high-res screens
  longText = rawText.repeat(20);

  textFont("monospace");
  textSize(18);
  textLeading(20);
}

function draw() {
  background(255);

  if (segmentation && segmentation.mask) {
    push();
    translate(width, 0);
    scale(-1, 1);

    // 3. Calculate "Cover" math so the mask isn't distorted
    let videoAspect = 160 / 120;
    let canvasAspect = width / height;
    let imgW, imgH;

    if (canvasAspect > videoAspect) {
      imgW = width;
      imgH = width / videoAspect;
    } else {
      imgH = height;
      imgW = height * videoAspect;
    }

    // Center the mask so you stay in the middle
    let x = (width - imgW) / 2;
    let y = (height - imgH) / 2;

    image(segmentation.mask, x, y, imgW, imgH);
    pop();

    fill(0);
    noStroke();
    // Fill the entire dynamic window with text
    text(longText, 0, 0, width, height);
  }
}

// 4. Handle window resizing (orientation change on mobile)
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function gotResults(result) {
  segmentation = result;
}
