import { useContext, FC, useRef } from "react";
import TodoContext from "./context/TodoContext";
import { MdOutlineDone } from "react-icons/md";
import { GiTireIronCross } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";

const TodoList: FC = () => {
	const todoContext = useContext(TodoContext);

	const handleDone = (id: number): void => {
		todoContext?.setTodos(
			todoContext.todos.map((todo) =>
				todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
			)
		);
	};

	const handleDelete = (id: number) => {
		todoContext?.setTodos(todoContext?.todos.filter((todo) => todo.id !== id));
	};

	return (
		<div className="grid grid-cols-2 gap-4 justify-items-center">
			{todoContext?.todos.map((todo) => (
				<div
					className="card w-96 bg-base-100 shadow-xl hover:shadow hover:shadow-cyan-500/50"
					key={todo.id}
				>
					<div className="card-body flex justify-center ">
						<AnimatePresence>
							<motion.div
								className="flex justify-center my-auto"
								animate={{
									opacity: 1,
								}}
								initial={{
									opacity: 0,
								}}
								exit={{
									opacity: 0,
								}}
								transition={{
									duration: 1,
								}}
							>
								{todo.isDone === true ? (
									<p className="line-through my-auto">{todo.todo}</p>
								) : (
									<motion.p
										className="my-auto "
										initial={{
											opacity: 0,
										}}
										animate={{
											opacity: 1,
										}}
										exit={{
											opacity: 0,
										}}
										transition={{
											duration: 1,
										}}
									>
										{todo.todo}
									</motion.p>
								)}

								<div className="button-group ">
									<button
										className="btn-sm btn-ghost"
										onClick={() => handleDelete(todo.id)}
									>
										<GiTireIronCross />
									</button>
									<button
										className="btn-sm btn-ghost"
										onClick={() => handleDone(todo.id)}
									>
										<MdOutlineDone />
									</button>
								</div>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
			))}
		</div>
	);
};

export default TodoList;
