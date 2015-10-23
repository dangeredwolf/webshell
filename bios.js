window.bootstart = true;
window.C = "C/"

var vmountfs = document.createElement("script");
vmountfs.src = "C/System Volume Information/tree.js";
document.head.appendChild(vmountfs);

var vkernel = document.createElement("script");
vkernel.src = "C/Windows/System32/ntoskrnl.js";
document.head.appendChild(vkernel);