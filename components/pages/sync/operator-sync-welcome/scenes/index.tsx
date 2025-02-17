import React from "react";

import { Card } from "./components/card";
import { Arrow } from "./components/arrow";
import { CircleBtn } from "./components/circle-btn";
import { useScenes } from "./hooks/use-scenes";
import { useSceneState } from "./hooks/use-scene-state";

export type ScenesProps = {
	onStart: () => void;
};

export function Scenes({ onStart }: ScenesProps) {
	const scenes = useScenes();
	const {
		total,
		currentScene,
		currentIndex,
		isFirstIndex,
		isLastIndex,
		goNext,
		goPrev,
	} = useSceneState(scenes);

	return (
		<div className="relative flex px-3vw">
			<div className="flex-1" key={currentIndex}>
				{currentScene.illustration}
			</div>
			<div className="w-350px">
				<Card index={currentIndex} total={total} onStart={onStart}>
					{currentScene.description}
				</Card>
			</div>
			<div className="absolute top-1/2 left-0 right-0 flex items-center px-16px transform -translate-y-1/2">
				<CircleBtn className="mr-auto" onClick={goPrev} hidden={isFirstIndex}>
					<Arrow direction="left" />
				</CircleBtn>
				<CircleBtn className="ml-auto" onClick={goNext} hidden={isLastIndex}>
					<Arrow direction="right" />
				</CircleBtn>
			</div>
		</div>
	);
}
