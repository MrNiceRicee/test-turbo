import React from "react";

import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { FlashList } from "@shopify/flash-list";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";

import { trpc } from "../utils/trpc";
import { TRPCClientError } from "@trpc/client";
import { useNavigate } from "react-router-native";

const PostCard: React.FC<{
  post: inferProcedureOutput<AppRouter["post"]["all"]>[number];
}> = ({ post }) => {
  return (
    <View className="p-4 border-2 border-gray-500 rounded-lg">
      <Text className="text-xl font-semibold text-gray-800">{post.title}</Text>
      <Text className="text-gray-600">{post.content}</Text>
    </View>
  );
};

const CreatePost: React.FC = () => {
  const utils = trpc.useContext();
  const { mutate, error: err } = trpc.post.create.useMutation({
    async onSuccess() {
      await utils.post.all.invalidate();
    },
  });

  const [title, onChangeTitle] = React.useState("");
  const [content, onChangeContent] = React.useState("");

  const formatTRPCError = (err: any) => {
    if (err instanceof TRPCClientError) {
      return err.data;
    }
  };

  return (
    <View className="p-4 border-t-2 border-gray-500 flex flex-col">
      <Text>{JSON.stringify(err?.data?.zodError?.fieldErrors, null, 2)}</Text>
      <TextInput
        className="border-2 border-gray-500 rounded p-2 mb-2"
        onChangeText={onChangeTitle}
        placeholder="Title"
      />
      <TextInput
        className="border-2 border-gray-500/10 rounded p-2 mb-2"
        onChangeText={onChangeContent}
        placeholder="Content"
        style={{
          shadowColor: "rgba(0,0,0, .4)", // IOS
          shadowOffset: { height: 1, width: 1 }, // IOS
          shadowOpacity: 1, // IOS
          shadowRadius: 1, //IOS
          elevation: 2, // Android
        }}
      />
      <TouchableOpacity
        className="bg-indigo-500 rounded p-2"
        onPress={() => {
          mutate({
            title,
            content,
          });
        }}
      >
        <Text className="text-white font-semibold">Publish post</Text>
      </TouchableOpacity>
    </View>
  );
};

export const HomeScreen = () => {
  const navigate = useNavigate();
  const postQuery = trpc.post.all.useQuery();
  const mobileQuery = trpc.mobile.getUsers.useQuery({
    limit: 10,
  });
  const [showPost, setShowPost] = React.useState<string | null>(null);

  const onPostPress = (id: string) => {
    navigate(`/post/${id}`);
  };

  return (
    <SafeAreaView>
      <View className="h-full w-full p-4">
        <Text className="text-5xl font-bold mx-auto pb-2">
          Create <Text className="text-indigo-500">T3</Text> Turbo
        </Text>

        <View className="py-2">
          {showPost ? (
            <Text>
              <Text className="font-semibold">Selected post:</Text>
              {showPost}
            </Text>
          ) : (
            <Text className="italic font-semibold">Press on a post</Text>
          )}
        </View>

        <Text className="font-semibold">Mobile users:</Text>
        <Text>{mobileQuery.data?.map((user) => user.name).join(", ")}</Text>

        <FlashList
          data={postQuery.data}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={(p) => (
            <TouchableOpacity onPress={() => onPostPress(p.item.id)}>
              <PostCard post={p.item} />
            </TouchableOpacity>
          )}
        />

        <CreatePost />
      </View>
    </SafeAreaView>
  );
};
